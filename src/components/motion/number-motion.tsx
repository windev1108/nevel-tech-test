'use client';

import NumberFlow from '@number-flow/react';
import React, { memo, useEffect, useState } from 'react';

interface NumberMotionProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  precision?: number;
  compact?: boolean;
  locale?: string;
  range?: number; // % range, ex:0.05 = ±5%
  interval?: number;
  enableJump?: boolean;
  min?: number; // min limit
  max?: number; // max limit
  integerOnly?: boolean;
  enableFormat?: boolean; // Enable/disable number formatting
}

const NumberMotion: React.FC<NumberMotionProps> = ({
  value,
  suffix = '',
  prefix = '',
  className,
  precision = 2,
  compact = true,
  locale = 'en-US',
  range = 0.02, // default range ±2%
  interval = 5000,
  enableJump = true,
  integerOnly = false,
  enableFormat = true, // Default to true for backward compatibility
  min,
  max,
}) => {
  const [animatedValue, setAnimatedValue] = useState(value);

  useEffect(() => {
    setAnimatedValue(value);
  }, [value]);

  useEffect(() => {
    if (!enableJump) return;

    const id = setInterval(() => {
      const percentOffset = (Math.random() * 2 - 1) * range;
      let newValue = value * (1 + percentOffset);

      // only get integer
      if (integerOnly) {
        newValue = Math.round(newValue);
      }

      // If exceeded, force to min/max
      if (typeof min === 'number' && newValue < min) {
        newValue = min;
      }
      if (typeof max === 'number' && newValue > max) {
        newValue = max;
      }

      setAnimatedValue(newValue);
    }, interval);

    return () => clearInterval(id);
  }, [value, range, interval, enableJump, min, max]);

  return (
    <NumberFlow
      className={className}
      value={enableJump ? animatedValue : value}
      format={
        enableFormat
          ? {
              style: 'decimal',
              notation: compact ? 'compact' : 'standard',
              minimumFractionDigits: compact ? 0 : precision,
              maximumFractionDigits: precision,
            }
          : undefined
      }
      prefix={prefix}
      suffix={suffix}
      locales={locale}
    />
  );
};

export default memo(NumberMotion);
