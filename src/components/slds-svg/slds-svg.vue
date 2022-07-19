<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :viewBox="viewBox"
        :class="svgClass"
        v-bind="dataProperty"
    >
        <action-sprite v-if="category === 'action'" :id="name"/>
        <custom-sprite v-else-if="category === 'custom'" :id="name"/>
        <doctype-sprite v-else-if="category === 'doctype'" :id="name"/>
        <standard-sprite v-else-if="category === 'standard'" :id="name"/>
        <utility-sprite v-else-if="category === 'utility'" :id="name"/>
    </svg>
</template>

<script>
import ActionSprite from './slds-svg-action-sprite.vue'
import CustomSprite from './slds-svg-custom-sprite.vue'
import DoctypeSprite from './slds-svg-doctype-sprite.vue'
import StandardSprite from './slds-svg-standard-sprite.vue'
import UtilitySprite from './slds-svg-utility-sprite.vue'
import {getCategory, getName, isValidName} from '../../utils/icon-utils'

const defaultCategory = 'standard'
const defaultName = 'default'

export default {
    name: 'SldsSvg',

    components: {
        ActionSprite,
        CustomSprite,
        DoctypeSprite,
        StandardSprite,
        UtilitySprite
    },

    props: {
        /**
         * The Lightning Design System name of the icon.
         * Names are written in the format 'utility:down' where 'utility' is the category,
         * and 'down' is the specific icon to be displayed.
         * @type {string}
         */
        iconName: {
            type: String,
            required: true,
        },

        /**
         * The rotation of the icon.
         * This value must be a multiple of 45 degrees.
         * @type {number}
         */
        rotation: Number,

        /**
         * Whether the icon should be displayed in standard format.
         * @type {boolean}
         */
        standardFormat: Boolean,
    },

    data() {
        return {
            /**
             * The category of the icon.
             * @type {string}
             */
            category: defaultCategory,

            /**
             * The name of the icon.
             * @type {string}
             */
            name: defaultName
        }
    },

    computed: {
        /**
         * The data property containing the icon name.
         * This property helps on testing.
         * @return {{[p: string]: string}}
         */
        dataProperty() {
            return {[`data-slds-svg-${this.iconName.replace(':', '-')}`]: ''}
        },

        /**
         * The computed SVG icon class.
         * @return {string}
         */
        svgClass() {
            if (this.category === 'standard') return ''
            return (this.standardFormat) ? 'standard-format-offset' : ''
        },

        /**
         * The computed view box for the SVG element.
         * @return {string}
         */
        viewBox() {
            if (this.category === 'action') return '0 0 52 52'
            if (this.category === 'custom') return '0 0 100 100'
            if (this.category === 'doctype') return '0 0 56 64'
            if (this.category === 'standard') return '0 0 100 100'
            if (this.category === 'utility') return '0 0 52 52'
            else throw 'Invalid icon category'
        }
    },

    watch: {
        iconName(value) {
            if (isValidName(value)) this.handleValidIcon(value)
            else this.handleInvalidIcon(value)
        }
    },

    created() {
        if (isValidName(this.iconName)) this.handleValidIcon(this.iconName)
        else this.handleInvalidIcon(this.iconName)
    },

    methods: {
        /**
         * Handles an invalid icon name setting the default category and name.
         * @param iconName
         */
        handleInvalidIcon(iconName) {
            const message = `<slds-svg> Invalid icon name ${iconName}`
            console.warn(message)

            this.category = defaultCategory
            this.name = defaultName
        },

        /**
         * Handles a valid icon name setting the parsed category and name.
         * @param iconName
         */
        handleValidIcon(iconName) {
            this.category = getCategory(iconName)
            this.name = getName(iconName)
        },
    }
}
</script>

<style>
.rotate-45 {
    transform: rotate(45deg);
}

.rotate-90 {
    transform: rotate(90deg);
}

.rotate-135 {
    transform: rotate(135deg);
}

.rotate-180 {
    transform: rotate(180deg);
}

.rotate-225 {
    transform: rotate(225deg);
}

.rotate-270 {
    transform: rotate(270deg);
}

.rotate-315 {
    transform: rotate(315deg);
}

.standard-format-offset {
    border-radius: .25rem;
}

.standard-format-offset.slds-icon_small {
    padding: 4px;
}

.standard-format-offset.slds-icon_medium {
    padding: 6px;
}

.standard-format-offset.slds-icon_large {
    padding: 8px;
}
</style>
