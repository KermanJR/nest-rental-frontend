import React from 'react';

const Container = ({children}: any) => {
  return (
    <div style={{
        width: "80%",
        margin: "0 auto"
    }}>
        {children}
    </div>
  )
}
export default Container;
