import { Builder } from "@builder.io/react";

export const Background = (props) => {
  return <div 
    className="background-color" 
    style={{'backgroundColor': `${props.backgroundColor}`}}
    >
      Sample Text
    </div>;
};

export async function componentRegister() {
  Builder.registerComponent(Background, {
    name: "Background",
    inputs: [
      {
        name: "backgroundColor",
        type: "color",
        defaultValue: "#6046e5"
      }
    ]
  });
}
