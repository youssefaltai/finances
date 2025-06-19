import { StyleProp, Text, TextStyle } from 'react-native'

type Props = { value: number, style: StyleProp<TextStyle> };

const Money = ({ value, style }: Props) => {
    return (
        <Text style={style}>£{value.toLocaleString('en-GB', { minimumFractionDigits: 2 })} EGP</Text>
    )
}

export default Money