import dynamic from 'next/dynamic';

const ReactModel = dynamic(() => import('./models/ReactLogo'), {
  ssr: false,
  loading: () => null
});

const DjangoModel = dynamic(() => import('./models/DjangoLogo'), {
  ssr: false,
  loading: () => null
});

const ReactNativeModel = dynamic(() => import('./models/ReactNativeLogo'), {
  ssr: false,
  loading: () => null
});

const AIModel = dynamic(() => import('./models/AILogo'), {
  ssr: false,
  loading: () => null
});

export {
  ReactModel,
  DjangoModel,
  ReactNativeModel,
  AIModel
};