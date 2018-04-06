import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'splitpascal'
})
export class SplitPascalWordPipe implements PipeTransform {
    transform(value: string): string {
        if ((typeof value) !== 'string') return value;
        value = value.split(/(?=[A-Z])/).join(' ');
        return value;
    }
}