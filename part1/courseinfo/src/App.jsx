import { useState } from 'react';

const Header = (props) => {
  return (
    <>
      <h1>{props.course.name}</h1>
    </>
  );
};

const Content = (props) => {
  return (
    <>
      {props.course.parts.map((part) => (
        <li>
          {part.name} {part.exercises}
        </li>
      ))}
    </>
  );
};

const Total = (props) => {
  return (
    <>
      <h1>Total: {props.course.getTotal()}</h1>
    </>
  );
};

function App() {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
    getTotal: function () {
      let sum = 0;
      this.parts.forEach((item) => (sum = item.exercises + sum));
      return sum;
    },
  };

  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
}

export default App;
