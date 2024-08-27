export const show = (setVis, contentRef) =>  {
  setTimeout(() => {setVis(true)}, 100);
  contentRef.current.style.animation = "content-in .12s linear";
}

export const hide = (setVis, contentRef) => {
  contentRef.current.style.animation = "content-out .12s linear";
  setTimeout(() => {setVis(false)}, 100);
} 