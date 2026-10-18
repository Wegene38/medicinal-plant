import { plants } from '../data'
import { useLang } from '../i18n'

export function About() {
  const { t, lang } = useLang()
  const china = plants.filter((p) => p.region === 'china').length
  const ireland = plants.length - china
  return (
    <article className="prose">
      <h1>{t('aboutTitle')}</h1>
      {lang === 'zh' ? (
        <>
          <p>
            《药用植物图鉴》介绍 {china} 种中国植物和 {ireland} 种爱尔兰药用植物，包括它们的生长环境、生长过程、药用价值、使用方法和注意事项，并对两地同属植物进行对比。中国部分收录了国家卫生健康委员会药食同源目录（2002、2019、2023、2024 年批次）中的全部植物和菌类，不含动物类与矿物类。</p>
          <p>
            app 里的「花草茶铺」销售的是食品（花草茶），与图鉴中的传统药用知识相互独立：商品页面只介绍风味、原料产地和冲泡方法，不作任何功效宣称。
          </p>
          <h2>⚠️ 免责声明</h2>
          <p>
            本应用内容仅用于科普和学习，<strong>不构成任何医疗建议</strong>，不能替代医生、执业中医师或注册草药师的诊断与治疗。
            草药同样可能产生副作用，也可能与药物发生相互作用；孕妇、哺乳期妇女、儿童及慢性病患者尤其需要谨慎。
            请勿根据本应用自行采集或服用任何野生植物，部分植物（如毛地黄）有剧毒，且容易与可食用植物混淆。
          </p>
          <h2>内容来源</h2>
          <ul>
            <li>中药部分的性味归经、功效与常用剂量参考《中华人民共和国药典》（2020 年版）及中药学教材。</li>
            <li>爱尔兰部分参考爱尔兰民间草药传统、欧洲药品管理局（EMA）草药专论，以及英国和爱尔兰的植物志。</li>
            <li>植物照片来自 Wikimedia Commons，作者与许可协议标注在各植物详情页。</li>
            <li>地图底图 © OpenStreetMap 贡献者。</li>
          </ul>
        </>
      ) : (
        <>
          <p>
            Medicinal Plant introduces {china} plants from China and {ireland} from Ireland: where they grow, how they grow, their
            medicinal value, how they are used and what to watch out for. The China section includes every plant and fungus on
            the National Health Commission’s food–medicine catalogue (2002, 2019, 2023 and 2024 batches), excluding animal and
            mineral items. It also compares related plants across the two traditions.</p>
          <p>
            The Herbal Tea Shop in the app sells foods (herbal infusions) and is kept separate from the guide’s traditional
            medicinal content: product pages describe flavour, origin and brewing only and make no health claims.
          </p>
          <h2>⚠️ Disclaimer</h2>
          <p>
            Everything in this app is for education only and <strong>is not medical advice</strong>. It does not replace a
            doctor, licensed TCM practitioner or registered herbalist. Herbs can have side effects and interact with medicines;
            take particular care in pregnancy, while breastfeeding, with children and with chronic illness. Never forage or
            take a wild plant based on this app: some, such as foxglove, are deadly and easily mistaken for edible plants.
          </p>
          <h2>Sources</h2>
          <ul>
            <li>
              TCM properties, actions and typical doses follow the Pharmacopoeia of the People’s Republic of China (2020) and
              standard TCM textbooks.
            </li>
            <li>
              Irish entries draw on Irish folk-herbal tradition, European Medicines Agency herbal monographs, and floras of
              Britain and Ireland.
            </li>
            <li>Plant photos come from Wikimedia Commons; the author and licence are credited on each plant page.</li>
            <li>Map tiles © OpenStreetMap contributors.</li>
          </ul>
        </>
      )}
    </article>
  )
}
