from setuptools import setup


with open('README.rst') as readme_file:
    readme = readme_file.read()

setup(
    name='germanium',
    version='2.0.0',
    description='The germanium project: Selenium WebDriver testing API that doesn\'t disappoint.',
    long_description = readme,
    author='Bogdan Mustiata',
    author_email='bogdan.mustiata@gmail.com',
    license='BSD',
    install_requires=[
        'germaniumdrivers==2.0.0',
        'selenium==2.53.6',
        'webcolors==1.5']
    ,
    packages=['germanium',
              'germanium.impl',
              'germanium.locators',
              'germanium.points',
              'germanium.selectors',
              'germanium.static',
              'germanium.util',
              'germanium.wa'],
    package_data={
        'germanium': ['*.js'],
        'germanium.impl': ['*.js'],
        'germanium.locators': ['*.js'],
        'germanium.points': ['*.js'],
        'germanium.util': ['*.js']
    }
)
