// Helper
const valueIsNumber = value => isNaN(Number(value)) === false;

export namespace Utilities {
  export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

	export function enumToPairArray(enumme) {
		return Object.keys(enumme)
			.filter(valueIsNumber)
			.map(key => [+key, enumme[key]]);
	}

	export function enumToNameMap(enumme): Map<string, number> {
		const result = new Map<string, number>();
		Object.keys(enumme)
			.filter(valueIsNumber)
			.map(key => result.set(enumme[key], +key));
		return result;
	}

	export function enumSearch(enumme, token: string) {
		return enumToNameMap(enumme).get(token);
	}

	export function jsonToQueryString(json: any): string {
		return Object.keys(json).map(function (key) {
			return encodeURIComponent(key) + '=' + encodeURIComponent(json[key]);
		}).join('&');
	}

	export function setToDelimeted(set: Set<string>, delimeter = ','): string {
		let result: string = '';
		// consider using new Array(set).join
		if (set && set.size > 0) {
			set.forEach(value => {
				if (result.length > 0) result += delimeter;
				result += value;
			});
		}
		return result;
	}

	export function elapseMillis(since: Date): number {
		const time = since ? (new Date()).valueOf() - new Date(since).valueOf() : 0;
		return time;
	}

	export function elapseSeconds(since: Date): number {
		return this.elapseMillis(since) / 1000;
	}

	export function elapseMinutes(since: Date): number {
		return this.elapseSeconds(since) / 60;
	}

  export function mapToObject<K extends string | number, V>(map: Map<K, V>): Object {
    // from: https://gist.github.com/lukehorvat/133e2293ba6ae96a35ba
    const obj = Array.from(map.entries()).reduce((main, [key, value]) => ({ ...main, [key]: value }), {});
    return obj;
  }
/*
  export function mapToRecord<K extends string | number, V>(map: Map<K, V>): Record<K, V> {
    let newObject: Record<K,V> = {}
    for (let [key, value] of map) {
      newObject[key] = value;
    }
    return newObject;
  }
*/
  export function mapToRecord(map: Map<string,string>): Record<string,string> {
    let newObject: Record<string,string> = {}
    for (let [key, value] of map) {
      newObject[key] = value;
    }
    return newObject;
  }

	export function mergeMaps<K extends string | number, V>(map1: Map<K, V>, map2: Map<K, V>): Map<K, V> {
		let mergedMap: Map<K, V> = new Map([...Array.from(map1.entries()), ...Array.from(map2.entries())]);
		return mergedMap;
  }
  
  export function isNumber(x: any): x is number {
    return typeof x === 'number';
  }

  export function isString(x: any): x is string {
    return typeof x === 'string';
  }


}