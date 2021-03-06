import React from 'react'
import assert from 'assert'
import sinon from 'sinon'
import { shallow } from 'enzyme'
import MetaFoxLogo from '../../../ui/metafox-logo'
import AppHeader from '../index'

describe('App Header', () => {
  let wrapper

  const props = {
    hideNetworkDropdown: sinon.spy(),
    showNetworkDropdown: sinon.spy(),
    toggleAccountMenu: sinon.spy(),
    history: {
      push: sinon.spy(),
    },
    network: 'test',
    provider: {},
    selectedAddress: '0xAddress',
    disabled: false,
    hideNetworkIndicator: false,
    networkDropdownOpen: false,
    isAccountMenuOpen: false,
    isUnlocked: true,
  }

  beforeEach(() => {
    wrapper = shallow(
      <AppHeader.WrappedComponent {...props} />, {
        context: {
          t: str => str,
          metricsEvent: () => {},
        },
      }
    )
  })

  afterEach(() => {
    props.toggleAccountMenu.resetHistory()
  })

  describe('App Header Logo', () => {
    it('routes to default route when logo is clicked', () => {
      const appLogo = wrapper.find(MetaFoxLogo)
      appLogo.simulate('click')
      assert(props.history.push.calledOnce)
      assert.equal(props.history.push.getCall(0).args[0], '/')
    })
  })

  describe('Network', () => {
    it('shows network dropdown when networkDropdownOpen is false', () => {
      const network = wrapper.find({ network: 'test' })

      network.simulate('click', {
        preventDefault: () => {},
        stopPropagation: () => {},
      })

      assert(props.showNetworkDropdown.calledOnce)
    })

    it('hides network dropdown when networkDropdownOpen is true', () => {
      wrapper.setProps({ networkDropdownOpen: true })
      const network = wrapper.find({ network: 'test' })

      network.simulate('click', {
        preventDefault: () => {},
        stopPropagation: () => {},
      })

      assert(props.hideNetworkDropdown.calledOnce)
    })

    it('hides network indicator', () => {
      wrapper.setProps({ hideNetworkIndicator: true })
      const network = wrapper.find({ network: 'test' })
      assert.equal(network.length, 0)
    })
  })

  describe('Account Menu', () => {

    it('toggles account menu', () => {
      const accountMenu = wrapper.find('.account-menu__icon')
      accountMenu.simulate('click')
      assert(props.toggleAccountMenu.calledOnce)
    })

    it('does not toggle account menu when disabled', () => {
      wrapper.setProps({ disabled: true })
      const accountMenu = wrapper.find('.account-menu__icon')
      accountMenu.simulate('click')
      assert(props.toggleAccountMenu.notCalled)
    })
  })

})
