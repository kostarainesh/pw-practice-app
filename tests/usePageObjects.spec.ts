import {test, expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import {faker} from '@faker-js/faker'

test.beforeEach(async({page}) => {
    await page.goto('/') //baseUrl in config
})

test('navigate to form page', async({page}) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('parametrized methods', async ({page}) => {
    const pm = new PageManager(page)
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'welcome1', 'Option 2')
    await page.screenshot({path: 'screenshots/formsLayoutsPage.png'})
    // const buffer = await page.screenshot()
    // console.log(buffer.toString('base64')) if we need it in binary and integrade somewhere else
    await pm.onFormLayoutsPage().submitInlineFormWithNameAndEmailAndCheckbox(randomFullName, randomEmail, false)
    await page.locator('nb-card', {hasText:"Inline Form"}).screenshot({path: 'screenshots/inlineForm.png'})
    await pm.navigateTo().datePickerPage()
    await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(5)
    await pm.onDatepickerPage().selectDatepickerWithRangeFromToday(6, 15)
})



