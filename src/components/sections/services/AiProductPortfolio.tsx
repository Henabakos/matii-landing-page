import ProductBentoGrid from './ProductBentoGrid';
import type { PillarContent } from '@/lib/pillars/schema';
export default function AiProductPortfolio({items}: {items: PillarContent['products']}) {
 const groups = [{name: 'All products', ids: items.map(p => p.id)},
 ...([{name: 'Data foundation', key: 'foundation'}, {name: 'Intelligence & insights', key: 'insights'}, {name: 'AI development', key: 'development'}] as const).map(g => ({name: g.name, ids: items.filter(p => p.group === g.key).map(p => p.id)})).filter(g => g.ids.length)];
 return <ProductBentoGrid items={items} groups={groups} />;
}
