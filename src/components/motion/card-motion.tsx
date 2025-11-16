'use client';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { memo, type ComponentProps, type ReactNode } from 'react';

type Variant = 'direction' | 'scale' | 'direction-scale';

interface CardMotionProps extends Omit<ComponentProps<typeof motion.div>, 'children' | 'className'> {
  image: string;
  children?: ReactNode;
  className?: string;
  variant?: Variant;
  direction?: 'up' | 'down' | 'left' | 'right';
  scale?: number; // base scale
  distance?: number; // px
  duration?: number; // seconds
  imageClassName?: string;
}

function CardMotion({
  image,
  children,
  className,
  variant = 'direction',
  direction = 'up',
  scale = 1.1,
  distance = 20,
  duration = 10,
  imageClassName,
  ...motionProps
}: CardMotionProps) {
  // pan animation
  const pan =
    direction === 'up'
      ? { y: [0, -distance, 0] }
      : direction === 'down'
        ? { y: [0, distance, 0] }
        : direction === 'left'
          ? { x: [0, -distance, 0] }
          : { x: [0, distance, 0] };

  // scale in/out loop
  const scaleAnim = { scale: [scale, scale + 0.05, scale, scale] };

  // pick animate from variant
  const animate = variant === 'direction' ? { ...pan } : variant === 'scale' ? scaleAnim : { ...pan, ...scaleAnim };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn('relative overflow-hidden bg-bg-brand-solid', className)}
      {...motionProps}
    >
      {/* background motion */}
      <motion.img
        src={image}
        alt=''
        className={cn('mix-blend-multiple absolute inset-0 h-full w-full object-cover opacity-15', imageClassName)}
        initial={{ scale }}
        animate={animate}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        }}
      />

      {/* foreground content */}
      <div className='relative'>{children}</div>
    </motion.div>
  );
}

export default memo(CardMotion);
