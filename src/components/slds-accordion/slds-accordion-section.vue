<template>
    <li class="slds-accordion__list-item">
        <section class="slds-accordion__section" :class="{'slds-is-open': isOpen}">

            <!-- Summary -->
            <div class="slds-accordion__summary">
                <h2 class="slds-accordion__summary-heading">
                    <button
                        :aria-expanded="isOpen"
                        class="slds-button slds-button_reset slds-accordion__summary-action"
                        @click="onClickLabel"
                    >

                        <!-- Chevron -->
                        <slds-svg
                            class="slds-accordion__summary-action-icon slds-button__icon slds-button__icon_left"
                            icon-name="utility:switch"
                        />

                        <!-- Content -->
                        <span class="slds-accordion__summary-content">
                            <slot name="summary">
                                {{ label }}
                            </slot>
                        </span>

                    </button>
                </h2>
            </div>

            <!-- Content -->
            <div class="slds-accordion__content">
                <slot>
                    {{ content }}
                </slot>
            </div>

        </section>
    </li>
</template>

<script>
import SldsSvg from '../slds-svg/slds-svg.vue'

export default {
    name: 'SldsAccordionSection',

    components: {
        SldsSvg
    },

    props: {
        /**
         * The content in the accordion section.
         * @type {string}
         */
        content: String,

        /**
         * The text that displays as the title of the section.
         * @type {string}
         */
        label: String,

        /**
         * The unique section name to use with the active-section-name attribute in the accordion component.
         * @type {string}
         */
        name: String,
    },

    computed: {
        /**
         * Gets the single active section name or list of section names.
         * @return {boolean}
         */
        isOpen() {
            const activeSectionName = this.$parent.$data.$_activeSectionName

            if (typeof (activeSectionName) === 'string') return activeSectionName === this.name
            if (Array.isArray(activeSectionName)) return activeSectionName.includes(this.name)
            return false
        },
    },

    methods: {
        /**
         * Handles the click event on the section label.
         */
        onClickLabel() {
            this.$parent.onActiveSectionChange(this.name)
            this.$emit('active-section-change', this.name)
        },
    },
}
</script>
