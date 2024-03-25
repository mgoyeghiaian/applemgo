export const animateWithGsapTimeline = (timeline, rotationREf, rotationState, firstTarget, secondTarget, animationProps) => {
  timeline.to(rotationREf.current.rotation, {
    y: rotationState,
    duration: 1,
    ease: 'power2.in0ut'
  })
  timeline.to(
    firstTarget, {
    ...animationProps,
    ease: 'power2,in0ut'
  },
    '<'
  )

  timeline.to(
    secondTarget, {
    ...animationProps,
    ease: 'power2,in0ut'
  },
    '<'
  )
}