import useColorMode from '@hooks/useColorMode';

const Loader = () => {
  useColorMode();
  return (
    <div className="flex h-screen items-center justify-center dark:bg-meta-4 bg-white">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-yellow-500 border-t-transparent"></div>
    </div>
  );
};

export default Loader;
