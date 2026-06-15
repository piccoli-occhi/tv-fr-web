import './styles/app.css'
import { registerControllers, startStimulusApp } from 'vite-plugin-symfony/stimulus/helpers'
import { registerVueControllerComponents } from 'vite-plugin-symfony/stimulus/helpers/vue'

registerVueControllerComponents(import.meta.glob('./vue/controllers/**/*.vue'))

const app = startStimulusApp()
registerControllers(
    app,
    import.meta.glob('./controllers/*_controller.js', {
        query: '?stimulus',
        eager: true,
    }),
)
