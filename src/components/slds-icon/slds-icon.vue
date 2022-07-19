<template>
    <span class="slds-icon_container" :class="containerClass" :title="title">

        <!-- Icon -->
        <slds-svg
            aria-hidden="true"
            class="slds-icon"
            :class="[iconClass, sizeClass, variantClass]"
            :icon-name="iconName"
            :standard-format="standardFormat"
        />

        <!-- Assistive text -->
        <span v-if="assistiveText" class="slds-assistive-text">
            {{ assistiveText }}
        </span>

    </span>
</template>

<script>
import SldsSvg from '../slds-svg/slds-svg.vue'
import {computeBackgroundClass, getCategory, isValidName} from '../../utils/icon-utils'

export default {
    name: 'SldsIcon',

    components: {
        SldsSvg,
    },

    props: {
        /**
         * The alternative text used to describe the icon.
         * This text should describe what happens when you click the button,
         * for example 'Upload File', not what the icon looks like, 'Paperclip'.
         * @type {string}
         */
        assistiveText: String,

        /**
         * The brand variant utilized to change the appearance of a utility icon.
         * @type {boolean}
         */
        brand: Boolean,

        /**
         * The current color variant utilized to change the appearance of a utility icon.
         * @type {boolean}
         */
        currentColor: Boolean,

        /**
         * The error variant utilized to change the appearance of a utility icon.
         * @type {boolean}
         */
        error: Boolean,

        /**
         * The icon class proxy property.
         * @type {string | string[]}
         */
        iconClass: [Array, String],

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
         * The inverse variant utilized to change the appearance of a utility icon.
         * @type {boolean}
         */
        inverse: Boolean,

        /**
         * The large size of the icon.
         * @type {boolean}
         */
        large: Boolean,

        /**
         * The light variant utilized to change the appearance of a utility icon.
         * @type {boolean}
         */
        light: Boolean,

        /**
         * The medium size of the icon.
         * This is the default size.
         * @type {boolean}
         */
        medium: Boolean,

        /**
         The small size of the icon.
         * @type {boolean}
         */
        small: Boolean,

        /**
         * Indicates whether the icon should be displayed in standard format.
         * @type {boolean}
         */
        standardFormat: Boolean,

        /**
         * The success variant utilized to change the appearance of a utility icon.
         * @type {boolean}
         */
        success: Boolean,

        /**
         * The x-small size of the icon.
         * @type {boolean}
         */
        xSmall: Boolean,

        /**
         * The xx-small size of the icon.
         * @type {boolean}
         */
        xxSmall: Boolean,

        /**
         * Icon title.
         * @type {boolean}
         */
        title: String,

        /**
         * The warning variant utilized to change the appearance of a utility icon.
         * @type {boolean}
         */
        warning: Boolean,

    },

    data() {
        return {
            /**
             * The background icon class.
             * @type {string}
             */
            backgroundClass: undefined,

            /**
             * The category of the icon.
             * @type {string}
             */
            category: undefined,

            /**
             * The name of the icon.
             * @type {string}
             */
            name: undefined,
        }
    },

    computed: {
        /**
         * The computed container class.
         * @return {string[]}
         */
        containerClass() {
            let classNames = [this.backgroundClass]

            if (this.currentColor) classNames.push('slds-current-color')

            return classNames
        },

        /**
         * The computed size class.
         * @return {string}
         */
        sizeClass() {
            if (this.xxSmall) return 'slds-icon_xx-small'
            if (this.xSmall) return 'slds-icon_x-small'
            if (this.small) return 'slds-icon_small'
            if (this.medium) return 'slds-icon_medium'
            if (this.large) return 'slds-icon_large'
            return 'slds-icon_medium'
        },

        /**
         * The computed variant class.
         * @return {string}
         */
        variantClass() {
            if (!isValidName(this.iconName)) return ''
            if (getCategory(this.iconName) !== 'utility') return ''

            if (this.brand) return 'slds-icon-text-brand'
            if (this.error) return 'slds-icon-text-error'
            if (this.inverse || this.standardFormat) return 'slds-icon-text-inverse'
            if (this.light) return 'slds-icon-text-light'
            if (this.success) return 'slds-icon-text-success'
            if (this.warning) return 'slds-icon-text-warning'
            if (this.currentColor) return ''
            return 'slds-icon-text-default'
        },
    },

    watch: {
        icon(value) {
            this.parseBackground(value)
        },
    },

    mounted() {
        this.parseBackground(this.iconName)
    },

    methods: {
        /**
         * Parses the background class from the icon name.
         * @param {string} iconName - The Lightning Design System name of the icon.
         */
        parseBackground(iconName) {
            let classNames = this.$el.classList
            if (classNames == null) classNames = []

            // Remove old background class if it exists
            if (this.backgroundClass) classNames.remove(this.backgroundClass)

            // If some custom background class was defined, just return
            for (let className of classNames) {
                if (className.startsWith('slds-icon-')) return
            }

            // Otherwise compute the proper background class for the icon
            if (this.iconName) this.backgroundClass = computeBackgroundClass(iconName)
        },
    },
}
</script>
