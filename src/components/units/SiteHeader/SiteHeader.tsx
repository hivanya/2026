'use client';

import React from 'react';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import { usePrefersReducedMotion } from '@/lib/hooks';
import { Chapters, Experience, PersonName, SocialLinks } from '@/utils/consts';

import classes from './SiteHeader.module.scss';

// Высота полосы, которую занимает шапка. По ней считаем, какая секция
// сейчас под ней проходит
const HeaderBand = 60;

const Swap = { duration: 0.22, ease: 'easeOut' } as const;
const Shift = 6;

type Place = (typeof Experience)[number];

const PlaceById = new Map(Experience.map((place) => [place.id, place]));

export const SiteHeader: React.FC = () => {
  const prefersReduced = usePrefersReducedMotion();
  const [visible, setVisible] = React.useState(false);
  const [onLight, setOnLight] = React.useState(false);
  const [place, setPlace] = React.useState<Place | null>(null);

  React.useEffect(() => {
    const intro = document.getElementById('about');
    if (!intro) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(intro);

    return () => observer.disconnect();
  }, []);

  // Фона у шапки нет, поэтому на светлых блоках белый текст пропадает.
  // Считаем корнем наблюдателя полоску под шапкой: как только в неё
  // въезжает светлая секция, перекрашиваем надписи в чёрный
  React.useEffect(() => {
    const targets = document.querySelectorAll('[data-surface="light"]');
    if (!targets.length) return;

    const lit = new Set<Element>();
    let observer: IntersectionObserver | null = null;

    const connect = () => {
      observer?.disconnect();
      lit.clear();

      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) lit.add(entry.target);
            else lit.delete(entry.target);
          }

          setOnLight(lit.size > 0);
        },
        {
          rootMargin: `0px 0px -${Math.max(0, window.innerHeight - HeaderBand)}px 0px`,
        },
      );

      targets.forEach((target) => observer?.observe(target));
    };

    connect();
    window.addEventListener('resize', connect);

    return () => {
      window.removeEventListener('resize', connect);
      observer?.disconnect();
    };
  }, []);

  // Секции идут стык в стык, поэтому текущая глава — последняя из тех,
  // что уже ушли под шапку
  React.useEffect(() => {
    const sections = Chapters.map(({ section, experience }) => ({
      node: document.getElementById(section),
      experience,
    })).filter(
      (item): item is { node: HTMLElement; experience: Place['id'] | null } =>
        Boolean(item.node),
    );

    if (!sections.length) return;

    let frame = 0;

    const pick = () => {
      frame = 0;

      const view = window.innerHeight;
      const left = Math.max(
        0,
        document.documentElement.scrollHeight - (window.scrollY + view),
      );

      // Последние секции короче экрана — страница кончается раньше, чем они
      // успевают уехать под шапку. У самого низа линию отсчёта плавно
      // спускаем к нижнему краю экрана, чтобы финальный блок тоже засчитался
      const probe = HeaderBand + Math.max(0, view - HeaderBand - left);

      let current: Place['id'] | null = null;

      for (const section of sections) {
        const rect = section.node.getBoundingClientRect();

        // Скрытые секции (на мобилке часть блоков display: none) отдают
        // нулевой прямоугольник и иначе считались бы уже пройденными
        if (!rect.height) continue;
        if (rect.top > probe) continue;

        current = section.experience;
      }

      setPlace(current ? (PlaceById.get(current) ?? null) : null);
    };

    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(pick);
    };

    pick();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          className={clsx(classes.header, onLight && classes.onLight)}
          initial={prefersReduced ? false : { y: '-100%' }}
          animate={{ y: 0 }}
          exit={prefersReduced ? undefined : { y: '-100%' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={classes.box}>
            <span className={classes.name}>{PersonName}</span>

            <div className={classes.chapter}>
              <AnimatePresence mode="wait" initial={false}>
                {place && (
                  <motion.p
                    key={place.id}
                    className={classes.place}
                    initial={
                      prefersReduced ? { opacity: 0 } : { opacity: 0, y: Shift }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    exit={
                      prefersReduced
                        ? { opacity: 0 }
                        : { opacity: 0, y: -Shift }
                    }
                    transition={Swap}
                  >
                    <span className={classes.company}>{place.company}</span>
                    <span className={classes.role}>{place.role}</span>
                    <span className={classes.years}>{place.years}</span>
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <ul className={classes.links}>
              {SocialLinks.map(({ id, label, href }) => (
                <li key={id}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={classes.link}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
};
