import { add } from './add'
import _ from 'lodash'

const a = [1, add(1, 1)]
const b = ['a', 'b']

document.write(JSON.stringify(_.zip(a, b)))
