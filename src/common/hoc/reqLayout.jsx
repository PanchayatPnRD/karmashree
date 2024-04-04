import React from 'react'
import DefaultLayout from '../layout/DefaultLayout';

function reqLayout(Component) {
  function HocLayout(props) {
    return (
     <DefaultLayout>
        <Component {...props}/>
      </DefaultLayout>     
    )
  }
return <HocLayout/>
}

export default reqLayout
