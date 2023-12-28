import type { Meta, StoryObj } from "@storybook/react";
import { TextSelect } from "../components/TextSelect/TextSelect";
import useMode from "../hooks/useMode";
import { ThemeProvider } from "../provider/ThemeProvider";
import { useEffect, useState } from "react";
import { Dialog } from "..";

const meta: Meta<typeof TextSelect> = {
  /* 👇 The title prop is Tab.
   * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
   * to learn how to generate automatic titles
   */
  title: "Components/TextSelect",
  component: TextSelect
};

export default meta;

type Story = StoryObj<typeof TextSelect>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/react/api/csf
 * to learn how to use render functions.
 */

export const Primary: Story = {
  render: () => {
    const mode = useMode();

    const [accountOptions, setAccountOptions] = useState<any>([]);

    const [from, setFrom] = useState('');

    const [to, setTo] = useState('');

    const change = (value: string) => {
      console.log(value);
      setFrom(value);
    };

    const changeTo = (value: string) => {
      console.log(value);
      setTo(value);
    };

    useEffect(() => {
      setTimeout(() => {
        const arr=[
          {
            label: "fundingAccount",
            value: "funding"
          },
          {
            label: "derivativesAccount",
            value: "derivatives"
          },
          {
            label: "copyTradingAccount",
            value: "copy_trading"
          },
          {
            label: "earnAccount",
            value: "earn"
          }
        ]
        setAccountOptions(arr);
        setFrom(arr[0].value)
        setTo(arr[1].value)
      }, 1000);
    }, []);

    return (
      <ThemeProvider value={{ theme: mode }}>
        <Dialog
          title="demo"
          size="large"
          open={true}
          footer={null}
          content={
            <div>
              <div className="bu-w-full">
                <TextSelect
                  placeholder="Select a person"
                  disabled={to}
                  defaultValue={from}
                  options={accountOptions}
                  onChange={change}
                />
              </div>
              <div className="bu-w-full">
                <TextSelect
                  placeholder="Select a person"
                  disabled={from}
                  defaultValue={to}
                  options={accountOptions}
                  onChange={changeTo}
                />
              </div>
            </div>
          }
        />
      </ThemeProvider>
    );
  }
};
