import { add } from './add'
import _ from 'lodash'

document.write(`<p>3 + 4 is ${add(3, 4)}<p>`)

document.writeln(`<p>${JSON.stringify(_.zip([1, 2], ['a', 'b']))}</p>`)
