import dynamic from 'next/dynamic';

export default dynamic(() => import('./CloudSceneImpl'), {
  ssr: false,
  loading: () => null
});
