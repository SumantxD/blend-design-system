import { render, screen, within } from '@testing-library/react-native'
import { BlendNativeProvider } from '../src/theme/BlendNativeProvider'
import { Sidebar } from '../src/components/Sidebar'
import type { SidebarSectionData } from '../src/components/Sidebar'
import { BottomSheet } from '../src/overlay/sheet/BottomSheet'
import { SideDrawer } from '../src/overlay/drawer/SideDrawer'

/**
 * Small-screen `mobilePresentation`: 'sheet' hosts the nav in a
 * `BottomSheet`, the default keeps the `SideDrawer`.
 */

const DATA: SidebarSectionData[] = [
    {
        label: 'Workspace',
        items: [
            { id: 'home', label: 'Home' },
            { id: 'reports', label: 'Reports' },
        ],
    },
]

describe('Sidebar — mobilePresentation', () => {
    it("renders the nav inside a BottomSheet for 'sheet'", () => {
        render(
            <BlendNativeProvider>
                <Sidebar
                    data={DATA}
                    isSmallScreen
                    mobilePresentation="sheet"
                    open
                    testID="sidebar"
                />
            </BlendNativeProvider>
        )
        const sheet = screen.getByTestId('sidebar')
        expect(within(sheet).getByText('Workspace')).toBeTruthy()
        expect(within(sheet).getByText('Home')).toBeTruthy()
        expect(screen.UNSAFE_getByType(BottomSheet)).toBeTruthy()
        expect(screen.UNSAFE_queryByType(SideDrawer)).toBeNull()
    })

    it('keeps the SideDrawer by default', () => {
        render(
            <BlendNativeProvider>
                <Sidebar data={DATA} isSmallScreen open testID="sidebar" />
            </BlendNativeProvider>
        )
        expect(
            within(screen.getByTestId('sidebar')).getByText('Home')
        ).toBeTruthy()
        expect(screen.UNSAFE_getByType(SideDrawer)).toBeTruthy()
        expect(screen.UNSAFE_queryByType(BottomSheet)).toBeNull()
    })
})
