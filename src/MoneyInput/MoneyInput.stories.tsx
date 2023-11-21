import { Meta } from '@storybook/react'
import MoneyInput from './MoneyInput'
import { userEvent, within } from '@storybook/testing-library'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Components/MoneyInput',
  component: MoneyInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    children: {
      type: { name: 'string', required: false },
      description: 'Content of the label',
    },
    locale: {
      type: { name: 'string', required: false },
      description: 'Sets number format, defaults to "en-US"',
      defaultValue: 'en-US',
    },
    type: {
      type: { name: 'string', required: false },
      description: 'Sets input type defaults to "tel"',
      defaultValue: 'tel',
    },
    className: {
      type: { name: 'string', required: false },
      description: 'Name of an additional class to be applied to the component',
    },
    onBlur: {
      type: { name: 'function', required: false },
      description: 'Function for handling onBlur event, receives input value in cents',
    },
    onChange: {
      type: { name: 'function', required: false },
      description: 'Function for handling onChange event, receives input value in cents',
    },
  },
} satisfies Meta<typeof MoneyInput>

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
const defaultArgs = {
  children: 'Amount in EUR:',
  onChange: (cents: number) => console.log('MoneyInput:onChange:cents:', cents),
  onBlur: (cents: number) => console.log('MoneyInput:onBlur:cents:', cents),
}

const playFn = async (canvasElement: HTMLElement, fn: (el: Element) => void) => {
  const canvas = within(canvasElement)
  const inputElement = await canvas.getByTestId('money-input')
  await fn(inputElement)
}

export const Default = {
  name: 'Default',
  args: {
    ...defaultArgs,
  },
}

export const DefaultFocus = {
  name: 'Default and Focus',
  args: {
    ...defaultArgs,
  },
  play: async ({ canvasElement }: any) => {
    playFn(canvasElement, (inputElement: Element) => {
      userEvent.click(inputElement)
    })
  },
}

export const InitialValue = {
  name: 'Initial Value',
  args: {
    ...defaultArgs,
    value: 420,
    children: 'A happy number please',
  },
}

export const InitialValueDE = {
  name: 'Initialwert',
  args: {
    ...defaultArgs,
    locale: 'de-DE',
    value: 420,
    children: 'Bitte eine glückliche Nummer',
  },
}

export const Placeholder = {
  name: 'Placeholder',
  args: {
    ...defaultArgs,
    children: undefined,
    placeholder: 'amount, please',
  },
}

export const Disabled = {
  name: 'Disabled',
  args: {
    ...defaultArgs,
    disabled: true,
  },
}

export const Error = {
  name: 'Error',
  args: {
    ...defaultArgs,
  },
  play: async ({ canvasElement }: any) => {
    playFn(canvasElement, (inputElement: Element) => {
      userEvent.type(inputElement, '12err')
    })
  },
}
