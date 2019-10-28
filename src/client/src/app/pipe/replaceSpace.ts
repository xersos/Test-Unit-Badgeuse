import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'replaceSpace'})
export class ReplaceSpace implements PipeTransform {

    transform(value: string): string {
        return value.replace(' ', '_');
    }
}