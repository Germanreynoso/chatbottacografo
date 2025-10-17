import { Component, AfterViewInit, ElementRef, ViewChild, CUSTOM_ELEMENTS_SCHEMA, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface Window {
    ElevenLabsWidget: any;
  }
}

@Component({
  selector: 'app-elevenlabs-widget',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div #widgetContainer class="widget-container">
      <elevenlabs-convai agent-id="agent_3701k7s9s2bresettenm6eeq75z7"></elevenlabs-convai>
    </div>
  `,
  styles: [`
    .widget-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }
  `]
})
export class ElevenlabsWidgetComponent implements AfterViewInit {
  @ViewChild('widgetContainer') widgetContainer!: ElementRef;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    // Solo cargar el script si estamos en el navegador
    if (this.isBrowser) {
      this.loadWidgetScript();
    }
  }

  private loadWidgetScript() {
    // Verificar si estamos en el navegador
    if (typeof document !== 'undefined') {
      // Verificar si el script ya está cargado
      if (document.querySelector('script[src*="elevenlabs"]')) {
        return;
      }

      // Crear y cargar el script
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
      script.async = true;
      script.type = 'text/javascript';
      document.body.appendChild(script);
    }
  }
}
