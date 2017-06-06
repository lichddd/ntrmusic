export default [

    {
      path: '/home1',
      name: 'Hello1',
      component: ()=>System.import('@/views/Hello'),
//    component: Hello,
      
    }
    ,
    {
      path: '/login1',
      name: 'login1',
      component: ()=>System.import('@/views/login'),
      
    }
    ,
  	
]
