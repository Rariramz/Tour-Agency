import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types';

const buildResolvers = (options: BuildOptions): ResolveOptions => {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [options.paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {},
    };
};

export default buildResolvers;