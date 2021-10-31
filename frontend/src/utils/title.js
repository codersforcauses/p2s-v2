// eslint-disable-next-line consistent-return
function getTitle(vm) {
  const { title } = vm.$options;
  if (title) {
    return typeof title === 'function' ? title.call(vm) : title;
  }
}

export default {
  created() {
    const title = getTitle(this);
    if (title) {
      document.title = `${title} | P2S RUGBYWORKS`;
    }
  },
};
