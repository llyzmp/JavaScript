{/* <div class="container">
  <img src="demo.png" />
  <p>hello</p>
</div> */}

const vnode = {
  tag: 'div',
  props: {
    class: 'container'
  },
  children:[
    {
      tag: 'img',
      props: {
        src: 'demo.png'
      }
    },
    {
      tag: 'p',
      props: {},
      children: ['hello']
    }
  ]
}