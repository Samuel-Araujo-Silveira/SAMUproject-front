// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: [
    '@pinia/nuxt',
  ],
  app: {
    pageTransition:{
      name: "page",
      mode: "out-in"
    },
    head: {
      script: [
        { src: '/assets/js/jquery.min.js', type: 'text/javascript' },
        { src: '/assets/js/popper.min.js', type: 'text/javascript' },
        { src: '/assets/js/bootstrap.min.js', type: 'text/javascript' },
        { src: '/assets/js/sidebar-menu.js', type: 'text/javascript' },
        { src: '/assets/js/app-script.js', type: 'text/javascript' },
        { src: '/assets/plugins/simplebar/js/simplebar.js', type: 'text/javascript' },
        { src: '/assets/plugins/Chart.js/Chart.min.js', type: 'text/javascript' },
        { src: '/assets/js/index.js', type: 'text/javascript' },
      ],
      link: [
        { rel: 'stylesheet', href: '/assets/css/pace.min.css' },
        { rel: 'icon', href: '/assets/images/image.png', type: 'image/x-icon' },
        { rel: 'stylesheet', href: '/assets/css/bootstrap.min.css' },
        { rel: 'stylesheet', href: '/assets/css/animate.css', type: 'text/css' },
        { rel: 'stylesheet', href: '/assets/css/icons.css', type: 'text/css' },
        { rel: 'stylesheet', href: '/assets/css/app-style.css' },
        { rel: 'stylesheet', href: '/assets/css/sidebar-menu.css' },
        { rel: 'stylesheet', href: '/assets/plugins/simplebar/css/simplebar.css' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css' },
        { rel: 'stylesheet', href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" },
      ],
    },
  },
});