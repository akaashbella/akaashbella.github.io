"""Run against `npm run preview` at localhost:4321. Requires Python Playwright + Chromium.
No browser installation is needed on the supplied Codex environment.
"""
from pathlib import Path
import json
from playwright.sync_api import sync_playwright

origin = 'http://localhost:4321'
routes = ['/', '/work/', '/research/', '/about/', '/resume/', '/contact/'] + ['/work/'+s+'/' for s in ['weight-perturbation','researchseek','agbizlogic','fittrack','mauka-energy','spotify-indiclid']]
output = Path('test-results');output.mkdir(exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path='/usr/bin/chromium',args=['--no-sandbox'])
    page = browser.new_page()
    errors=[];failures=[]
    page.on('pageerror',lambda error:errors.append(str(error)))
    page.on('console',lambda message:errors.append(message.text) if message.type=='error' else None)
    page.on('requestfailed',lambda request:failures.append(request.url))
    page.on('response',lambda response:failures.append(f'{response.status} {response.url}') if response.status>=400 else None)
    for width in [375,768,1024,1440]:
        page.set_viewport_size({'width':width,'height':1000})
        for route in routes:
            page.goto(origin+route);page.evaluate('document.fonts.ready')
            assert page.locator('h1').count()==1,(route,width,'h1')
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'),(route,width,'horizontal overflow')
            assert page.locator('img').evaluate_all('(images)=>images.every(img=>img.complete && img.naturalWidth>0)'),(route,'broken image')
        page.goto(origin+'/');page.evaluate('document.fonts.ready')
        page.screenshot(path=str(output/f'home-{width}.png'),full_page=True)
    page.set_viewport_size({'width':375,'height':850});page.goto(origin+'/')
    toggle=page.get_by_role('button',name='Index')
    assert toggle.is_visible()
    toggle.focus();page.keyboard.press('Enter')
    assert toggle.get_attribute('aria-expanded')=='true'
    page.keyboard.press('Tab');assert page.evaluate('document.activeElement.textContent')=='Work'
    page.keyboard.press('Escape');assert toggle.get_attribute('aria-expanded')=='false'
    assert toggle.evaluate('(el)=>el===document.activeElement')
    page.goto(origin+'/research/')
    slider=page.get_by_role('slider',name='Perturbation strength')
    slider.focus();page.keyboard.press('Home')
    assert page.locator('#alpha-value').inner_text()=='α = 0.00'
    clean=page.locator('[data-panel=baseline] span').evaluate_all('(els)=>els.map(el=>el.style.background)')
    changed=page.locator('[data-panel=perturbed] span').evaluate_all('(els)=>els.map(el=>el.style.background)')
    assert clean==changed
    page.keyboard.press('End');assert slider.input_value()=='1'
    assert page.locator('#alpha-value').inner_text()=='α = 1.00'
    assert clean!=page.locator('[data-panel=perturbed] span').evaluate_all('(els)=>els.map(el=>el.style.background)')
    page.keyboard.press('ArrowLeft');assert slider.input_value()=='0.99'
    page.get_by_text('Read the numeric tensor values').click()
    assert page.locator('[data-numeric=perturbed]').first.is_visible()
    page.screenshot(path=str(output/'research-mobile.png'),full_page=True)
    page.emulate_media(reduced_motion='reduce')
    assert page.evaluate('getComputedStyle(document.documentElement).scrollBehavior')=='auto'
    page.goto(origin+'/');page.keyboard.press('Tab')
    assert page.evaluate('document.activeElement.textContent')=='Skip to content'
    page.keyboard.press('Enter');assert page.evaluate('document.activeElement.id')=='main'
    page.set_viewport_size({'width':1440,'height':1000});page.goto(origin+'/research/')
    page.screenshot(path=str(output/'research-desktop.png'),full_page=True)
    page.goto(origin+'/resume/');page.emulate_media(media='print')
    assert not page.locator('.masthead').is_visible()
    assert not page.locator('.resume-actions').is_visible()
    page.pdf(path=str(output/'resume-print.pdf'),format='A4',print_background=True)
    page.emulate_media(media='screen')
    assert not errors,errors
    assert not failures,failures
    nojs=browser.new_context(java_script_enabled=False,viewport={'width':375,'height':850})
    plain=nojs.new_page();plain.goto(origin+'/');assert plain.get_by_role('link',name='Research',exact=True).is_visible()
    plain.goto(origin+'/research/');assert plain.get_by_text('Read the numeric tensor values').is_visible()
    assert plain.locator('[data-controls]').is_hidden()
    plain.get_by_text('Read the numeric tensor values').click();assert plain.locator('[data-numeric=perturbed]').first.is_visible()
    browser.close()
    print(json.dumps({'routes':len(routes),'viewports':[375,768,1024,1440],'console_errors':errors,'network_failures':failures,'keyboard':'passed','reduced_motion':'passed','no_javascript':'passed','print':'passed'}))
