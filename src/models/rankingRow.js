export class RankingRow {
  constructor(
    order,
    team,
    played,
    win,
    lose,
    draw,
    goalsFor,
    goalsAgainst,
    points
  ) {
    this.order = order;
    this.team = team;
    this.played = played;
    this.win = win;
    this.lose = lose;
    this.draw = draw;
    this.goalsFor = goalsFor;
    this.goalsAgainst = goalsAgainst;
    this.points = points;
  }

  print() {
    console.log(
      `${this.order}\t${this.team}\t\t${this.played}\t${this.win}\t${this.lose}\t${this.draw}\t${this.goalsFor}\t${this.goalsAgainst}\t${this.points}`
    );
  }
}
