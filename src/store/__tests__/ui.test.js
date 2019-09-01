import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import sinon from "sinon";
import { Home } from "../../Home";

Enzyme.configure({ adapter: new Adapter() });

describe("Home Screen", () => {
  it("should handle button click event", () => {
    const onButtonClick = sinon.spy();

    const app = shallow(<Home makeCall={onButtonClick} />);
    const button = app.find({ id: "testButton" });

    button.simulate("click");

    expect(onButtonClick.calledOnce).toBe(true);
  });

  it('should display counter value "42"', () => {
    const app = shallow(<Home counter={42} />);
    const counter = app.find({ id: "testCounter" });

    expect(counter.text()).toEqual("42");
  });
});
