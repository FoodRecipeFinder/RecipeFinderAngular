import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'step'
})
export class StepPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    return value.replaceAll("\r\n\r\n","\n\n").replaceAll("\r\n","\n\n")
    // return value.replace("\r\n","\n\n").replace("\r\n","\n"+"\n")
  }

}
