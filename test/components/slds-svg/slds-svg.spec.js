import {flushPromises, mount} from '@vue/test-utils'
import {describe, test, expect} from 'vitest'
import SldsSvg from '../../../src/components/slds-svg/slds-svg.vue'

describe('SldsSvg', () => {
    test.concurrent('should do something when something', async () => {
        // Arrange
        const wrapper = mountComponent()

        // Act
        await flushPromises()

        // Assert
        expect(true).toBeTruthy()
    })
})

const mountComponent = () => {
    const options = {
        propsData: {
            iconName: 'utility:add',
        },
    }

    return mount(SldsSvg, options)
}
