import * as React from "react";
import { defaultLocale } from "../../hooks/useLocale";
import localization from "./localization";

type CategoryStatsProps = {
	stats?: StatsDTO;
	locale: string;
};
export const Stats = ({locale, stats}: CategoryStatsProps) => {
	const total = stats ? Object.values(stats.stats).reduce((acc, curr) => acc += curr) : 0;

	return (
		<div>
			<h3>{localization[locale].title}</h3>
			{stats ?
				<div>
					<h5>{localization[locale].total}: {total}</h5>
					{Object.keys(stats.stats).map(s => <StatBar name={s} value={stats.stats[s]} total={total}/>)}
				</div> :
				<h4>{localization[locale].noData}</h4>}
		</div>
	);
};



type StatBarProps= {
	total: number;
	name: string;
	value: number;
}
const StatBar = ({name, total, value}: StatBarProps) => {
	return (<div key={name}>
		<span className="theme-green-light-text">{name}</span>: {value}
		<div key={name} className="progress">
			<div className="determinate animate__animated animate__slow animate__lightSpeedInLeft" style={{width: `${value/total * 100}%`}}/>
		</div>
	</div>);
};

Stats.defaultProps = {
	locale: defaultLocale,
};

