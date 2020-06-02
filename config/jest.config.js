module.exports = {
    collectCoverageFrom: ['src/**/*.js'],

    rootDir: '../',

    modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],

    testPathIgnorePatterns: ['.cache', 'config', 'node_modules', 'public', 'src'],

    setupFilesAfterEnv: [
        '<rootDir>/config/jest.loadershim.js',
        '<rootDir>/tests/jest.setup.js',
        '<rootDir>/tests/__mocks__/localStorage.js',
    ],

    transform: {
        '^.+\\.jsx?$': '<rootDir>/config/jest.pre-process.js',
    },

    transformIgnorePatterns: ['node_modules/(?!(gatsby)/)'],

    // Sets up mocks for images and files that the tests either can"t handle
    // or doesn"t make sense to include

    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/tests/__mocks__/file-mock.js',
        '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
        '^@hooks(.*)$': '<rootDir>/src/hooks$1',
        '^@components(.*)$': '<rootDir>/src/components$1',
        '^@components(.*)$': '<rootDir>/src/components$1',
        '^@context(.*)$': '<rootDir>/src/context$1',
        '^@lib(.*)$': '<rootDir>/src/lib$1',
        '^@theme(.*)$': '<rootDir>/src/lib/theme$1',
    },
};
