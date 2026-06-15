import './styles/app.css'
import '@nordhealth/components'
import { registerControllers, startStimulusApp } from 'vite-plugin-symfony/stimulus/helpers'
import { registerVueControllerComponents, type VueModule } from 'vite-plugin-symfony/stimulus/helpers/vue'

registerVueControllerComponents(import.meta.glob<VueModule>('./vue/controllers/**/*.vue'))

const app = startStimulusApp()
registerControllers(
    app,
    import.meta.glob('./controllers/*_controller.ts', {
        query: '?stimulus',
        eager: true,
    }),
)
