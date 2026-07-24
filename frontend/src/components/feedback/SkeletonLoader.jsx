import React from 'react';
import clsx from 'clsx';

export const SkeletonLoader = ({
  variant = 'rectangular',
  width,
  height,
  className,
  count = 1,
  ...props
}) => {
  const baseClasses = 'bg-slate-800 animate-pulse relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-gradient-to-r before:from-transparent before:via-slate-700/30 before:to-transparent';

  const variants = {
    text: 'h-3 w-3/4 rounded-md my-1.5',
    title: 'h-6 w-1/2 rounded-md my-2.5',
    circular: 'rounded-full shrink-0',
    rectangular: 'rounded-lg w-full',
  };

  const skeletonStyle = {
    width: width || undefined,
    height: height || (variant === 'circular' ? width : undefined),
  };

  const skeletonItem = (index) => (
    <div
      key={index}
      className={clsx(baseClasses, variants[variant], className)}
      style={skeletonStyle}
      {...props}
    />
  );

  if (count > 1) {
    return (
      <div className="flex flex-col gap-2 w-full">
        {Array.from({ length: count }).map((_, i) => skeletonItem(i))}
      </div>
    );
  }

  return skeletonItem(0);
};

export default SkeletonLoader;
