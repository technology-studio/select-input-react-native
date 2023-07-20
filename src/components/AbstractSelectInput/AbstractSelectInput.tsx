import { Component } from 'react'

export type Option = {
  value: string,
  label: string,
}

export type Props = {
  enabled?: boolean,
  onBeginEditing?: () => void,
  onEndEditing?: () => void,
  onSubmitEditing?: (value: string) => void,
  onValueChange?: (value: string) => void,
  options: Option[],
  value: string,
}

type State = {
  selectedValue: string,
}

export class AbstractSelectInput<PROPS extends Props> extends Component<PROPS, State> {
  constructor (props: PROPS) {
    super(props)

    this.state = {
      selectedValue: props.value,
    }
  }

  componentDidUpdate (prevProps: PROPS): void {
    const { value } = this.props
    const prevValue = prevProps.value

    if (value !== prevValue) {
      this.setState({
        selectedValue: value,
      })
    }
  }

  focus (): void {
    // NOTE: - implemented on iOS only..
  }

  onCancel = (): void => {
    const { onEndEditing } = this.props
    onEndEditing?.()
  }

  onSubmit = (value: string): void => {
    const { onSubmitEditing } = this.props

    this.setState({ selectedValue: value }, function () {
      onSubmitEditing?.(value)
    })
  }

  onValueChange = (value: string): void => {
    const { onValueChange } = this.props
    onValueChange?.(value)
  }

  getValueLabel = (): (string | undefined)[] => {
    const { options, value } = this.props

    return (
      options.map(function (option) {
        if (option.value === value) {
          return option.label
        }
        return undefined
      })
    )
  }
}
