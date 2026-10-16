import { defineElement, html, Okalit } from '@okalit/core';
import styles from './ok-ui-chart.css?inline';

@defineElement({ tag: 'ok-ui-chart', styles: [styles], props: [
  { label: { type: String, value: 'Actividad' } },
  { type: { type: String, value: 'bar' } },
  { data: { type: Array, value: [] } },
  { height: { type: Number, value: 260 } },
] })
export class OkUiChart extends Okalit {
  onAfterRender() {
    if (!Array.isArray(this.data.value) || !this.data.value.length) {
      this._chart?.dispose();
      this._chart = null;
      this._observer?.disconnect();
      this._themeObserver?.disconnect();
      this._observer = null;
      this._themeObserver = null;
      return;
    }
    if (this._chart) this.draw();
    else this.ensureChart();
  }

  async ensureChart() {
    if (this._loading) return;
    this._loading = (async () => {
      const [echarts, charts, components, renderers] = await Promise.all([
        import('echarts/core'), import('echarts/charts'), import('echarts/components'), import('echarts/renderers'),
      ]);
      if (!this.isConnected) return;
      echarts.use([charts.BarChart, charts.LineChart, charts.PieChart, components.GridComponent, components.TooltipComponent, renderers.CanvasRenderer]);
      const canvas = this.renderRoot.querySelector('.chart');
      if (!canvas) return;
      this._chart = echarts.init(canvas, null, { renderer: 'canvas' });
      this._observer = new ResizeObserver(() => this._chart?.resize());
      this._observer.observe(canvas);
      const container = this.parentElement;
      if (container) {
        this._themeObserver = new MutationObserver(() => this.draw());
        this._themeObserver.observe(container, { attributes: true, attributeFilter: ['class', 'style'] });
      }
      this.draw();
    })().finally(() => { this._loading = null; });
  }

  draw() {
    if (!this._chart) return;
    const theme = getComputedStyle(this);
    const primary = theme.getPropertyValue('--ok-primary').trim() || '#7aa2f7';
    const secondary = theme.getPropertyValue('--ok-primary-2').trim() || '#00d4ff';
    const text = theme.getPropertyValue('--ok-muted').trim() || '#56657e';
    const border = theme.getPropertyValue('--ok-border').trim() || '#cbd5e5';
    const points = (Array.isArray(this.data.value) ? this.data.value : []).map((entry) => ({ name: String(entry?.label ?? ''), value: Number(entry?.value) || 0 }));
    const type = ['bar', 'line', 'pie'].includes(this.type.value) ? this.type.value : 'bar';
    const options = type === 'pie'
      ? { color: [primary, secondary, '#456fc6', '#91b4ff'], tooltip: { trigger: 'item', renderMode: 'richText' }, series: [{ type: 'pie', radius: ['30%', '65%'], data: points, label: { color: text } }] }
      : { grid: { left: 42, right: 15, top: 15, bottom: 36 }, tooltip: { trigger: 'axis', renderMode: 'richText' }, xAxis: { type: 'category', data: points.map((point) => point.name), axisLabel: { color: text }, axisLine: { lineStyle: { color: border } } }, yAxis: { type: 'value', axisLabel: { color: text }, splitLine: { lineStyle: { color: border } } }, series: [{ type, data: points.map((point) => point.value), itemStyle: { color: primary }, lineStyle: { color: primary }, areaStyle: type === 'line' ? { color: secondary, opacity: .1 } : undefined }] };
    this._chart.setOption(options, true);
  }

  onDestroy() {
    this._observer?.disconnect();
    this._themeObserver?.disconnect();
    this._chart?.dispose();
    this._chart = null;
  }

  render() {
    const data = Array.isArray(this.data.value) ? this.data.value : [];
    const height = Number.isFinite(this.height.value) ? Math.max(180, Math.min(this.height.value, 480)) : 260;
    return html`<figure><figcaption>${this.label.value}</figcaption>${data.length ? html`<div class="chart" style="height:${height}px" role="img" aria-label="Grafica de ${this.label.value}"></div><details><summary>Ver datos</summary><table><thead><tr><th scope="col">Categoria</th><th scope="col">Valor</th></tr></thead><tbody>${data.map((entry) => html`<tr><td>${entry.label}</td><td>${entry.value}</td></tr>`)}</tbody></table></details>` : html`<p role="status">Sin datos</p>`}</figure>`;
  }
}