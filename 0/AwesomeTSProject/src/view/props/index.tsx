// props默认值

import React, { PropsWithChildren } from 'react';

// 1.1 函数参数默认值
function Son1({ defaultTime = 10 }) {
  return <div>The timer is : {defaultTime}</div>;
}

interface IItemProps {
  name?: string;
  age?: number;
}

const Item: React.FC<IItemProps> = (props: PropsWithChildren<IItemProps>) => {
  return (
    <div>
      <h2>this is Item</h2>
      <div>
        <span>name---{props.name}</span>
        <span>age---{props.age}</span>
      </div>
    </div>
  );
};

function Son2({ defaultTime }: any) {
  return <div>The second timer is: {defaultTime}</div>;
}

// 1.2 defaultProps 设置默认值
Son2.defaultProps = {
  defaultTime: 100,
};

class Son3 extends React.Component {
  static defaultProps: { defaultTime: number };
  render() {
    // @ts-ignore
    return <div>The defaultTimer is : {this.props.defaultTime}</div>;
  }
}

// 2.1 函数 defaultProps 设置默认值
Son3.defaultProps = {
  defaultTime: 3333,
};

// 2.2 静态属性声明
class Son4 extends React.Component {
  static defaultProps = {
    defaultTime: 66666,
  };

  render() {
    // @ts-ignore
    return <div>The defaultTimer is : {this.props.defaultTime}</div>;
  }
}

class App extends React.Component {
  render() {
    return (
      <div>
        <Son1 />
        <Son2 />
        <Son3 />
        <Son4 />
        <Item />
      </div>
    );
  }
}

export default App;
