export interface Alg {
    cube: string;
    method: string;
    algSet: string;
    algName: string;
    alg: string;
    algImg: string;
  }
  
  export interface CubeData {
    name: string;
    cubeImg: string;
    methods: {
      name: string;
      methodImg: string;
      algSets: {
        name: string;
        algSetImg: string;
      }[];
    }[];
  }
  