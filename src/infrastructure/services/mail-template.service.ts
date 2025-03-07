import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailTemplateService {
  renderTemplate(templateName: string, payload: any): string {
    const basePath = path.resolve(__dirname, '..', '..', 'infrastructure', 'templates');
    const templatePath = path.join(basePath, `${templateName}.html`);
    let template = fs.readFileSync(templatePath, 'utf8');
    template = template.replace(/{{\s*(\w+)\s*}}/g, (_, key) => {
      return payload[key] || `{{${key}}}`;
    });
  
    return template;
  }
}