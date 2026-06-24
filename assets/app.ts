import './styles/app.css'
import { Icon } from '@nordhealth/components'
import '@nordhealth/components'
import { registerControllers, startStimulusApp } from 'vite-plugin-symfony/stimulus/helpers'
import { registerVueControllerComponents, type VueModule } from 'vite-plugin-symfony/stimulus/helpers/vue'

Icon.registerResolver((name) =>
    fetch(`/images/icons/${name}.svg`).then((res) => {
        if (!res.ok) {
            throw new TypeError(`NORD: unknown icon: '${name}'`)
        }

        return res.text()
    }),
)

registerVueControllerComponents(import.meta.glob<VueModule>('./vue/controllers/**/*.vue'))

const app = startStimulusApp()
registerControllers(
    app,
    import.meta.glob('./controllers/*_controller.ts', {
        query: '?stimulus',
        eager: true,
    }),
)
