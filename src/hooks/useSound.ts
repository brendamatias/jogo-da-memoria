export const useSound = (url: string, volume = 1) => {
  const play = () => {
    const audio = new Audio(url);
    audio.volume = volume;
    audio.play();
  };
  return play;
};
